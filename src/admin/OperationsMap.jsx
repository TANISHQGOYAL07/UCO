import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { supabase } from '../supabaseClient';

export default function OperationsMap() {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tomtomMap;
    const apiKey = import.meta.env.VITE_TOMTOM_API_KEY || 'your_tomtom_api_key_here';
    
    // Default center for India
    const defaultCenter = [77.2090, 28.6139];

    if (mapElement.current) {
      tomtomMap = tt.map({
        key: apiKey,
        container: mapElement.current,
        center: defaultCenter,
        zoom: 5,
      });

      tomtomMap.on('load', () => {
        setMap(tomtomMap);
      });
      
      tomtomMap.addControl(new tt.NavigationControl(), 'top-left');
    }

    return () => {
      if (tomtomMap) {
        tomtomMap.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map || !supabase) return;

    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch suppliers and buyers
        const [suppliersRes, buyersRes] = await Promise.all([
          supabase.from('suppliers').select('*'),
          supabase.from('buyers').select('*')
        ]);

        const suppliers = suppliersRes.data || [];
        const buyers = buyersRes.data || [];

        // Add supplier markers (green)
        suppliers.forEach(supplier => {
          if (supplier.longitude && supplier.latitude) {
            const popup = new tt.Popup({ offset: 35 }).setHTML(`
              <div style="padding: 10px;">
                <h4 style="margin: 0 0 5px 0;">${supplier.name}</h4>
                <p style="margin: 0; font-size: 12px; color: #666;">Pickup Location (${supplier.type})</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Contact: ${supplier.contact}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Avg Oil: ${supplier.avg_monthly_oil} L</p>
              </div>
            `);

            const markerElement = document.createElement('div');
            markerElement.style.width = '30px';
            markerElement.style.height = '30px';
            markerElement.style.backgroundColor = '#10b981'; // Green for pickups
            markerElement.style.borderRadius = '50%';
            markerElement.style.border = '3px solid white';
            markerElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

            new tt.Marker({ element: markerElement })
              .setLngLat([supplier.longitude, supplier.latitude])
              .setPopup(popup)
              .addTo(map);
          }
        });

        // Add buyer markers (blue)
        buyers.forEach(buyer => {
          if (buyer.longitude && buyer.latitude) {
            const popup = new tt.Popup({ offset: 35 }).setHTML(`
              <div style="padding: 10px;">
                <h4 style="margin: 0 0 5px 0;">${buyer.name}</h4>
                <p style="margin: 0; font-size: 12px; color: #666;">Selling Location (${buyer.type})</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Rate: ₹${buyer.contract_rate}/L</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Total Bought: ${buyer.total_bought} L</p>
              </div>
            `);

            const markerElement = document.createElement('div');
            markerElement.style.width = '30px';
            markerElement.style.height = '30px';
            markerElement.style.backgroundColor = '#3b82f6'; // Blue for buyers
            markerElement.style.borderRadius = '50%';
            markerElement.style.border = '3px solid white';
            markerElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

            new tt.Marker({ element: markerElement })
              .setLngLat([buyer.longitude, buyer.latitude])
              .setPopup(popup)
              .addTo(map);
          }
        });

      } catch (error) {
        console.error("Error loading map data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [map]);

  return (
    <div className="operations-map-container" style={{ position: 'relative', width: '100%', height: 'calc(100vh - 150px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      {loading && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div className="spinner"></div>
          <span style={{ marginLeft: '10px', color: '#475569', fontWeight: 'bold' }}>Loading map data...</span>
        </div>
      )}
      <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 1 }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Legend</h4>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '8px', border: '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}></div>
          <span style={{ fontSize: '13px' }}>Pickup Locations</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '50%', marginRight: '8px', border: '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}></div>
          <span style={{ fontSize: '13px' }}>Selling Locations</span>
        </div>
      </div>
    </div>
  );
}

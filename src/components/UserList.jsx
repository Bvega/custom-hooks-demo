import React, { useState } from 'react';
import { useFetch } from '../hooks';

export function UserList() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('users');
  
  // Use the useFetch hook with JSONPlaceholder API
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/${selectedEndpoint}`
  );

  const endpoints = [
    { value: 'users', label: 'Users' },
    { value: 'posts', label: 'Posts' },
    { value: 'albums', label: 'Albums' },
    { value: 'todos', label: 'Todos' }
  ];

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #28a745',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '20px auto',
      backgroundColor: '#f8fff8',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ 
        color: '#28a745', 
        marginBottom: '20px',
        textAlign: 'center' 
      }}>
        🌐 API Data Fetcher
      </h2>

      {/* Endpoint Selector */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label style={{ 
          fontWeight: 'bold', 
          marginRight: '10px',
          color: '#333'
        }}>
          Choose API Endpoint:
        </label>
        <select 
          value={selectedEndpoint}
          onChange={(e) => setSelectedEndpoint(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #28a745',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          {endpoints.map(endpoint => (
            <option key={endpoint.value} value={endpoint.value}>
              {endpoint.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#666' 
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
          <div>Loading {selectedEndpoint}...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: '#ffe6e6',
          border: '1px solid #ff4444',
          borderRadius: '4px',
          color: '#cc0000'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>❌</div>
          <div><strong>Error:</strong> {error.message}</div>
        </div>
      )}

      {/* Success State */}
      {data && !loading && !error && (
        <div>
          <div style={{ 
            marginBottom: '15px',
            textAlign: 'center',
            color: '#28a745',
            fontWeight: 'bold'
          }}>
            ✅ Loaded {data.length} {selectedEndpoint}
          </div>
          
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            {data.slice(0, 5).map((item, index) => (
              <div key={item.id || index} style={{
                padding: '12px',
                borderBottom: index < 4 ? '1px solid #eee' : 'none',
                backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
              }}>
                {selectedEndpoint === 'users' && (
                  <div>
                    <strong style={{ color: '#333' }}>{item.name}</strong>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      📧 {item.email} • 🌐 {item.website}
                    </div>
                  </div>
                )}
                
                {selectedEndpoint === 'posts' && (
                  <div>
                    <strong style={{ color: '#333' }}>{item.title}</strong>
                    <div style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
                      {item.body.substring(0, 100)}...
                    </div>
                  </div>
                )}
                
                {selectedEndpoint === 'albums' && (
                  <div>
                    <strong style={{ color: '#333' }}>{item.title}</strong>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      👤 User ID: {item.userId}
                    </div>
                  </div>
                )}
                
                {selectedEndpoint === 'todos' && (
                  <div>
                    <span style={{ 
                      color: item.completed ? '#28a745' : '#ffc107',
                      marginRight: '10px'
                    }}>
                      {item.completed ? '✅' : '⏰'}
                    </span>
                    <span style={{ color: '#333' }}>{item.title}</span>
                  </div>
                )}
              </div>
            ))}
            
            {data.length > 5 && (
              <div style={{ 
                padding: '12px', 
                textAlign: 'center', 
                color: '#666',
                fontStyle: 'italic' 
              }}>
                ... and {data.length - 5} more items
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: '15px', 
        textAlign: 'center',
        fontSize: '12px',
        color: '#666',
        fontStyle: 'italic' 
      }}>
        Data fetched from JSONPlaceholder API using useFetch hook
      </div>
    </div>
  );
}
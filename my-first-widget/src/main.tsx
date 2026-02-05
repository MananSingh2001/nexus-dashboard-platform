
const GenericWidget = ({ title, type, color }: { title: string; type: string; color?: string }) => {
  // Fallback to your signature indigo if no color is provided
  const bgColor = color || 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)';

  return (
    <div style={{
      padding: '24px',
      background: bgColor,
      color: 'white',
      borderRadius: '16px',
      height: '100%',
      transition: 'transform 0.2s',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h3>
      <p style={{ opacity: 0.9, marginTop: '8px', fontSize: '0.875rem' }}>Status: {type}</p>
      <div style={{ marginTop: '20px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
        <div style={{ width: '60%', height: '100%', background: '#fff', borderRadius: '2px' }}></div>
      </div>
    </div>
  );
};

// Register the universal library
(window as any)["NexusWidgets"] = {
  "DefaultCard": GenericWidget
};
'use client'

function Key({ label }: { label: string }) {
  return (
    <div
      style={{
        width: '26px',
        height: '26px',
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.35)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {label}
    </div>
  )
}

export function HUD() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'monospace',
        fontSize: '13px',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.35)',
          borderRadius: '8px',
          padding: '10px 14px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 26px)',
            gap: '3px',
            marginBottom: '6px',
          }}
        >
          <span />
          <Key label="W" />
          <span />
          <Key label="A" />
          <Key label="S" />
          <Key label="D" />
        </div>
        <div style={{ opacity: 0.6, fontSize: '11px' }}>Move</div>
        <div style={{ opacity: 0.4, fontSize: '10px', marginTop: '6px' }}>Click to orbit</div>
      </div>
    </div>
  )
}

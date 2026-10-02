import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { SlackIcon } from '../ui/Icons';
import { SectionVideoBackground } from '../video/SectionVideoBackground';

interface SlackMessage {
  id: string;
  sender: string;
  avatarColor: string;
  isStaff: boolean;
  time: string;
  text: string;
  imageUrl?: string;
}

export const WarehouseFloorSlackDemo: React.FC = () => {
  const [messages, setMessages] = useState<SlackMessage[]>([
    {
      id: '1',
      sender: 'Brett Vance (Founder @ Vance Moto Performance)',
      avatarColor: '#3B82F6',
      isStaff: false,
      time: '11:42 AM',
      text: 'Hey Pontiac team! We just had 85 orders drop for our Dual Slip-On Exhausts and Touring Fender kits. Can we confirm the heavy-duty foam corner cradles are queued for today’s 1:00 PM trailer sweep?',
    },
    {
      id: '2',
      sender: 'Marcus Miller (Pontiac Floor Supervisor)',
      avatarColor: '#FF6B00',
      isStaff: true,
      time: '11:45 AM',
      text: 'Hey Brett! Packing Bay 3 has all 85 orders on the staging tables right now. Custom foam blocks are fitted and boxed in our 36x12x10 cartons under our negotiated DIM factor rate. Here’s a live photo proof right off the pack bench:',
      imageUrl: '/images/target-motorcycle-parts.jpg',
    },
    {
      id: '3',
      sender: 'Brett Vance (Founder @ Vance Moto Performance)',
      avatarColor: '#3B82F6',
      isStaff: false,
      time: '11:48 AM',
      text: 'That packaging is bulletproof! Old 3PL was dinging us 32 lbs DIM weight on those 8.5 lb exhaust pipes. You guys literally cut our carrier invoice in half, and we’ve had zero customer returns.',
    },
    {
      id: '4',
      sender: 'Marcus Miller (Pontiac Floor Supervisor)',
      avatarColor: '#FF6B00',
      isStaff: true,
      time: '11:49 AM',
      text: 'Anytime! Tracking pushes to Shopify at 12:45 PM before the FedEx Home Delivery and USPS trailers roll out. 🚀',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Can we hold order #8492 for an urgent address change on the exhaust kit?',
    'What’s the current pallet inventory count for SKU-EXH-FATBOY-BLK?',
    'Could you verify carton breakdown on our inbound pallet delivery?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: SlackMessage = {
      id: Date.now().toString(),
      sender: 'You (Brand Founder)',
      avatarColor: '#8B5CF6',
      isStaff: false,
      time: 'Just now',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate floor response in 1.2s
    setTimeout(() => {
      let replyText = 'Received on the floor! Staged and confirmed. Your dedicated packing lead is handling this right now.';
      let replyImg: string | undefined = undefined;

      if (text.toLowerCase().includes('hold') || text.toLowerCase().includes('address')) {
        replyText = 'Order #8492 has been pulled from staging bay #3 and placed on hold! Send over the revised address and we will relabel it before the 1:00 PM trailer sweep.';
      } else if (text.toLowerCase().includes('photo') || text.toLowerCase().includes('sticker') || text.toLowerCase().includes('proof') || text.toLowerCase().includes('pack')) {
        replyText = 'Here is the high-res photo proof of the packaging line right off our Pontiac packing bench:';
        replyImg = '/images/target-motorcycle-parts.jpg';
      } else if (text.toLowerCase().includes('count') || text.toLowerCase().includes('sku') || text.toLowerCase().includes('inventory')) {
        replyText = 'Scanned high-bay rack #A-14: Exactly 184 units of SKU-EXH-FATBOY-BLK counted across 4 pallets. WMS inventory count is 100% synchronized.';
      } else if (text.toLowerCase().includes('pallet') || text.toLowerCase().includes('inbound') || text.toLowerCase().includes('carton')) {
        replyText = 'Inbound freight dock confirmed: 4 pallets received, 68 cartons unloaded, and all 5 SKUs verified against ASN within 30 minutes.';
      }

      const floorReply: SlackMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'Dave Kowalski (Pontiac Operations Lead)',
        avatarColor: '#FF6B00',
        isStaff: true,
        time: 'Just now',
        text: replyText,
        imageUrl: replyImg,
      };

      setMessages((prev) => [...prev, floorReply]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section
      id="slack-floor"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        backgroundColor: 'var(--bg-darkest)',
        overflow: 'hidden',
      }}
    >
      {/* Background Video 4: Warehouse Floor Packing Station & Real-Time WMS */}
      <SectionVideoBackground
        videoUrl="/videos/tablet-warehouse.mp4"
        posterUrl="/images/tablet-warehouse-poster.jpg"
        overlayOpacity={0.78}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3rem' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>
            No Support Ticket Purgatory. Chat Directly with Your Packing Bench.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.6, textShadow: '0 1px 3px rgba(0,0,0,0.95)' }}>
            When you need an address updated before carrier pickup, or want photo verification of a special holiday gift insert, you message our Pontiac packing leads in a shared Slack channel. Average response time: under 5 minutes.
          </p>
        </div>

        {/* Simulated Slack Window Container */}
        <div
          className="glass-panel"
          style={{
            maxWidth: 880,
            margin: '0 auto',
            backgroundColor: 'var(--slack-window-bg)',
            border: '1px solid var(--slack-border)',
            borderRadius: 0,
            overflow: 'hidden',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {/* Slack Window Header Bar */}
          <div
            style={{
              backgroundColor: 'var(--slack-header-bg)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 0,
                  backgroundColor: '#4A154B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <SlackIcon size={16} color="#fff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-white)', fontWeight: 700, fontSize: '0.92rem' }}>
                  <span>#starshippp-aurelien-ops</span>
                  <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: 0, background: 'rgba(52, 211, 153, 0.16)', color: '#34D399', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    SHARED FLOOR CHANNEL
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  3 Pontiac Warehouse Floor Leads & 2 DTC Brand Operators Active
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pulse-dot" style={{ color: '#34D399' }} />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 700 }}>
                FLOOR OPERATORS ONLINE
              </span>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              padding: '1.5rem',
              minHeight: 380,
              maxHeight: 480,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              backgroundColor: 'var(--slack-chat-bg)',
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 0,
                    backgroundColor: msg.avatarColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                    fontSize: '0.85rem',
                  }}
                >
                  {msg.sender.substring(0, 1)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '0.9rem' }}>
                      {msg.sender}
                    </span>
                    {msg.isStaff && (
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.1rem 0.35rem',
                          borderRadius: 0,
                          backgroundColor: 'rgba(255, 107, 0, 0.2)',
                          color: 'var(--brand-orange-light)',
                        }}
                      >
                        PONTIAC FLOOR STAFF
                      </span>
                    )}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {msg.time}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: '#F1F5F9', fontWeight: 500, lineHeight: 1.55 }}>
                    {msg.text}
                  </p>

                  {msg.imageUrl && (
                    <div style={{ marginTop: '0.75rem', maxWidth: 360, borderRadius: 0, overflow: 'hidden', border: '1px solid var(--border-card)' }}>
                      <img
                        src={msg.imageUrl}
                        alt="Warehouse unboxing proof"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                      <div style={{ padding: '0.35rem 0.65rem', backgroundColor: 'var(--slack-header-bg)', fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        📸 Station 4 Cam • Live Unboxing Proof
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', fontStyle: 'italic' }}>
                <span className="pulse-dot" style={{ color: 'var(--brand-orange)' }} />
                <span>Dave Kowalski is typing on the Pontiac floor terminal...</span>
              </div>
            )}
          </div>

          {/* Interactive Quick Prompts */}
          <div
            style={{
              padding: '0.65rem 1.25rem',
              backgroundColor: 'var(--slack-header-bg)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-orange-light)' }}>
              TEST INTERACTIVE PROMPTS:
            </span>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 650,
                  padding: '0.4rem 0.75rem',
                  borderRadius: 0,
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brand-orange)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)')}
              >
                "{prompt}"
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: '1.15rem 1.35rem',
              backgroundColor: 'var(--slack-header-bg)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '0.85rem',
            }}
          >
            <input
              type="text"
              placeholder="Ask the Pontiac floor anything (e.g. 'Can you check SKU-ROBE?')..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              style={{
                flex: 1,
                padding: '0.85rem 1.15rem',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 0,
                color: 'var(--text-white)',
                fontSize: '0.96rem',
              }}
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="btn-primary"
              style={{ padding: '0.85rem 1.6rem', fontSize: '1rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              aria-label="Send message to floor"
            >
              <Send size={17} />
              <span>Send Ping</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

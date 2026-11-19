import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bot, MessageCircle, Send, X } from 'lucide-react';

const quickQuestions = [
  'What services do you offer?',
  'Tell me about Nishree',
  'How can I contact you?',
];

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi! I can help with services, skills, projects, or getting in touch.',
};

function getAnswer(message) {
  const query = message.toLowerCase();

  if (/nishree|saree|project|portfolio|e-?commerce/.test(query)) {
    return {
      text: 'Nishree is a saree e-commerce project. You can visit the store here.',
      link: 'https://nishree.in/',
      linkText: 'Visit Nishree.in',
    };
  }

  if (/service|development|design|testing|marketing|content|support|cloud/.test(query)) {
    return {
      text: 'Services are organized into Development, Design, Testing, Marketing, Content, and Support. Open Our Services to browse the full list.',
      link: '#services',
      linkText: 'Explore services',
    };
  }

  if (/skill|technology|tech stack|react|javascript|python|mongodb|mysql|node/.test(query)) {
    return {
      text: 'The portfolio covers frontend, backend, databases, programming languages, and developer tools. The full skills list is in About Me.',
      link: '#about',
      linkText: 'View skills',
    };
  }

  if (/contact|email|hire|reach|message|talk/.test(query)) {
    return {
      text: 'Use the contact form and your message will be sent to the site inbox. You can also email directly at smiliesanjay@gmail.com.',
      link: '#contact',
      linkText: 'Go to contact form',
    };
  }

  return {
    text: 'I can help with services, skills, projects, and contact details. Try one of the quick questions below.',
  };
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([welcomeMessage]);
  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;

    inputRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'end',
    });
  }, [messages, isOpen, reduceMotion]);

  const sendMessage = (rawMessage) => {
    const text = rawMessage.trim();
    if (!text) return;

    const now = Date.now();
    const answer = getAnswer(text);
    setMessages((current) => [
      ...current,
      { id: `user-${now}`, role: 'user', text },
      { id: `assistant-${now}`, role: 'assistant', ...answer },
    ]);
    setDraft('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <m.aside
            className="chat-panel"
            role="dialog"
            aria-label="Portfolio chat assistant"
            aria-modal="false"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="chat-header">
              <span className="chat-header-icon"><Bot size={20} aria-hidden="true" /></span>
              <div className="chat-header-copy">
                <h2>Portfolio Assistant</h2>
                <p>Quick answers about this site</p>
              </div>
              <button
                className="chat-close"
                type="button"
                aria-label="Close chat assistant"
                onClick={() => setIsOpen(false)}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions text">
              {messages.map((message) => (
                <div className={`chat-message ${message.role}`} key={message.id}>
                  <p>{message.text}</p>
                  {message.link && (
                    <a href={message.link} target={message.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {message.linkText} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              ))}

              {messages.length === 1 && (
                <div className="chat-quick-questions" aria-label="Quick questions">
                  {quickQuestions.map((question) => (
                    <button key={question} type="button" onClick={() => sendMessage(question)}>
                      {question}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="chat-message">Ask a question</label>
              <input
                id="chat-message"
                ref={inputRef}
                type="text"
                maxLength={400}
                placeholder="Ask about this portfolio..."
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
              <button type="submit" aria-label="Send question" disabled={!draft.trim()}>
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
          </m.aside>
        )}
      </AnimatePresence>

      <button
        className="chat-launcher"
        type="button"
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <MessageCircle size={25} aria-hidden="true" />}
        {!isOpen && <span className="chat-launcher-pulse" aria-hidden="true" />}
      </button>
    </div>
  );
}

export default ChatWidget;

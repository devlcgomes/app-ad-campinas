import { useState } from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

const getNextEvents = () => {
  const today = new Date();
  const events = [];
  const daysToAdd = 7;

  for (let i = 0; i < daysToAdd; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const weekDay = date.getDay();

    // Cultos regulares
    if (weekDay === 3) {
      // Quarta
      events.push({
        id: `culto-quarta-${date.getTime()}`,
        title: "Culto de Quarta",
        displayDate: "Quarta-feira - 19:30",
        type: "culto",
        participants: [
          "https://ui-avatars.com/api/?name=User+1&background=6366f1&color=fff",
          "https://ui-avatars.com/api/?name=User+2&background=6366f1&color=fff",
          "https://ui-avatars.com/api/?name=User+3&background=6366f1&color=fff",
        ],
      });
    } else if (weekDay === 5) {
      // Sexta
      events.push({
        id: `culto-sexta-${date.getTime()}`,
        title: "Culto de Sexta",
        displayDate: "Sexta-feira - 19:30",
        type: "culto",
        participants: [
          "https://ui-avatars.com/api/?name=User+1&background=6366f1&color=fff",
          "https://ui-avatars.com/api/?name=User+2&background=6366f1&color=fff",
        ],
      });
    } else if (weekDay === 0) {
      // Domingo
      events.push({
        id: `culto-domingo-${date.getTime()}`,
        title: "Culto de Domingo",
        displayDate: "Domingo - 19:00",
        type: "culto",
        participants: [
          "https://ui-avatars.com/api/?name=User+1&background=6366f1&color=fff",
          "https://ui-avatars.com/api/?name=User+2&background=6366f1&color=fff",
          "https://ui-avatars.com/api/?name=User+3&background=6366f1&color=fff",
        ],
      });
    } else if (weekDay === 2) {
      // Terça
      events.push({
        id: `ensaio-${date.getTime()}`,
        title: "Ensaio Geral",
        displayDate: "Terça-feira - 19:30",
        type: "ensaio",
        participants: [
          "https://ui-avatars.com/api/?name=User+1&background=6366f1&color=fff",
          "https://ui-avatars.com/api/?name=User+2&background=6366f1&color=fff",
        ],
      });
    }
  }

  return events
    .sort((a, b) => {
      // Ordena por data real para manter a sequência correta
      const dateA = new Date(parseInt(a.id.split("-").pop() || "0"));
      const dateB = new Date(parseInt(b.id.split("-").pop() || "0"));
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);
};

interface MenuItem {
  id: string;
  icon: string;
  title: string;
  notifications?: number;
}

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("agenda");
  const upcomingEvents = getNextEvents();

  const menuItems: MenuItem[] = [
    { id: "agenda", icon: "📅", title: "Agenda", notifications: 2 },
    { id: "repertorio", icon: "🎵", title: "Repertório" },
    { id: "equipe", icon: "👥", title: "Equipe", notifications: 1 },
    { id: "ensaios", icon: "🎸", title: "Ensaios" },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <motion.img
              src="https://ui-avatars.com/api/?name=Luciano+Gomes&background=6366f1&color=fff"
              alt="Perfil"
              className="profile-image"
              whileTap={{ scale: 0.95 }}
            />
            <div className="greeting">
              <h2>{getGreeting()}, Luciano!</h2>
              <p>Tecladista</p>
            </div>
          </div>
          <motion.button
            className="notifications-btn"
            whileTap={{ scale: 0.95 }}
          >
            🔔
          </motion.button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            className={`tab-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tab-icon">{item.icon}</span>
            <span className="tab-title">{item.title}</span>
            {item.notifications && (
              <span className="notification-badge">{item.notifications}</span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        <section className="upcoming-events">
          <div className="section-header">
            <h3>Próximos Eventos</h3>
            <button className="see-all-btn">Ver todos</button>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                className={`event-card ${event.type}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p>{event.displayDate}</p>
                </div>
                <div className="event-participants">
                  {event.participants.map((participant, index) => (
                    <img
                      key={index}
                      src={participant}
                      alt="Participante"
                      className="participant-avatar"
                      style={{ zIndex: event.participants.length - index }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="quick-actions">
          <div className="section-header">
            <h3>Ações Rápidas</h3>
          </div>
          <div className="actions-grid">
            <motion.button
              className="action-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🎼</span>
              <p>Nova Música</p>
            </motion.button>
            <motion.button
              className="action-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📝</span>
              <p>Criar Ensaio</p>
            </motion.button>
            <motion.button
              className="action-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>👥</span>
              <p>Convidar</p>
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
};

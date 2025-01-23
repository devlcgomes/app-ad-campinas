import { useState } from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

interface MenuItem {
  id: string;
  icon: string;
  title: string;
  notifications?: number;
}

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("agenda");

  const menuItems: MenuItem[] = [
    { id: "agenda", icon: "📅", title: "Agenda", notifications: 2 },
    { id: "repertorio", icon: "🎵", title: "Repertório" },
    { id: "equipe", icon: "👥", title: "Equipe", notifications: 1 },
    { id: "ensaios", icon: "🎸", title: "Ensaios" },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Ensaio Geral",
      date: "Hoje, 19:30",
      participants: [
        "https://ui-avatars.com/api/?name=User+1&background=6366f1&color=fff",
        "https://ui-avatars.com/api/?name=User+2&background=6366f1&color=fff",
        "https://ui-avatars.com/api/?name=User+3&background=6366f1&color=fff",
      ],
    },
    {
      id: 2,
      title: "Culto Domingo",
      date: "Amanhã, 18:00",
      participants: ["user2.jpg", "user4.jpg", "user5.jpg"],
    },
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
                className="event-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
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

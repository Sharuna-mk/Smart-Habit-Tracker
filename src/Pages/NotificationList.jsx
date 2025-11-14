import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUserAuth } from "../context/Userauthcontext";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function NotificationList() {
  const { user } = useUserAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(list);
    });

    return () => unsubscribe();
  }, [user]);

  // Function to mark notification as read
  const markAsRead = async (notifId) => {
    try {
      const notifRef = doc(db, "notifications", notifId);
      await updateDoc(notifRef, { read: true });

      // Optional: update local state immediately
      setNotifications(prev =>
        prev.map(n => n.id === notifId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error("Error updating notification: ", error);
    }
  };


  const removeNotification = async (notifId) => {
    try {
      const notifRef = doc(db, "notifications", notifId);


      await deleteDoc(notifRef);
      setNotifications(prev => prev.filter(n => n.id !== notifId));
    } catch (error) {
      console.error("Error deleting notification: ", error);
    }
  };
  return (
    <div className="notification">
      <div className="d-flex justify-content-start">
        <button className="btn">
          <Link to='/home' className="text-dark">
            <IoChevronBackOutline style={{ fontSize: '25px' }} />
          </Link>
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card shadow mt-5 w-75">
          <h4 className="text-center mb-3 fw-bolder mt-5" style={{ color: '#02081bff' }}>
            Notifications
          </h4>
          {notifications.length === 0 ? (
            <p className="text-center text-muted">No notifications yet</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  backgroundColor: notif.read
                    ? "#f0f0f0"
                    : notif.type === "success"
                      ? "#e6ffe6"
                      : notif.type === "error"
                        ? "#ffe6e6"
                        : "#fffbe6",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px 15px",
                  marginBottom: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <p className="m-0">{notif.message}</p>
                <small style={{ color: "gray" }}>
                  {notif.createdAt?.toDate && (
                    <div className="d-flex justify-content-between align-items-center">
                      {notif.createdAt.toDate().toLocaleString()}
                      <div>
                        {!notif.read && (
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => markAsRead(notif.id)}
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeNotification(notif.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationList;

import React from "react";

export default function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        This is a personal art gallery project built with React and Node.js. 
        You can view, add, and manage paintings depending on your access level. 
        Admins can add or update paintings, while visitors can browse the gallery.
      </p>
      <p>
        The project uses a MySQL database to store painting information, and images
        are uploaded to the server and displayed dynamically.
      </p>
    </div>
  );
}

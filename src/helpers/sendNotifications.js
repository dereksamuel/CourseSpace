import Push from "push.js";

export const notify = (title, body) => {
  Push.create(title, {
    body,
    icon: '../assets/logo_sm.svg',
    timeout: 4000,
    onClick: function () {
        window.focus();
        this.close();
    }
  });
};
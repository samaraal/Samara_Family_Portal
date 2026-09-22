Samara Family Portal v1.0.13

ROOT CAUSE FIXED:
The date-wise activity modal code was present in js/family-app-v1.0.6.js, but its CSS had been added to styles.css. The deployed index.html actually loads css/style.css, so the new View All interface was not rendered as a modal.

Replace exactly preserving paths:
/index.html
/service-worker.js
/css/style.css
/js/family-app-v1.0.6.js

After deployment the sidebar must show Family Portal v1.0.13.
Click Care Timeline > View all to see date controls and category buttons.

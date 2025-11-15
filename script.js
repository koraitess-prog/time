const container = document.getElementById("tree-container");
const rustTree = document.getElementById("rust-tree");

let zoom = 1;

// יצירת "גרעיני חלודה" רנדומליים
const rustSeeds = Array.from({ length: 12 }, () => ({
    x: Math.random(),
    y: Math.random(),
    strength: 0.35 + Math.random() * 0.65
}));

function updateRustEffect() {
    let rustLevel = Math.min(1, (zoom - 1) / 4);  // טווח זום גדול יותר

    let mask = `radial-gradient(circle at center, rgba(0,0,0,${rustLevel}) 0%, rgba(0,0,0,0) 100%)`;

    rustTree.style.clipPath = mask;

    // אפקט רנדומלי
    if (zoom > 1.2) {
        rustTree.style.opacity =
            rustLevel * (0.7 + Math.random() * 0.3);
    } else {
        rustTree.style.opacity = 0;
    }
}

window.addEventListener("wheel", (event) => {
    zoom += event.deltaY * -0.0015;
    zoom = Math.min(Math.max(zoom, 1), 5); // הגדלתי את טווח הזום

    container.style.transform = `scale(${zoom})`;

    updateRustEffect();
});
const clean = document.getElementById("tree-clean");
const rust = document.getElementById("tree-rust");

let zoom = 1;
let maxZoom = 4;
let minZoom = 1;

// שינוי נקודת הזום לפי מיקום העכבר
document.addEventListener("wheel", function (e) {
    e.preventDefault();

    // חישוב כיוון הזום
    const delta = e.deltaY > 0 ? -0.1 : 0.1;

    // זום חדש
    let newZoom = zoom + delta;
    if (newZoom < minZoom) newZoom = minZoom;
    if (newZoom > maxZoom) newZoom = maxZoom;

    // חישוב יחס בין הזום הקודם לחדש
    const zoomFactor = newZoom / zoom;
    zoom = newZoom;

    // מיקום העכבר יחסית למסך
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // הזזת origin של הזום למיקום העכבר
    clean.style.transformOrigin = `${mouseX}px ${mouseY}px`;
    rust.style.transformOrigin = `${mouseX}px ${mouseY}px`;

    // החלת זום
    clean.style.transform = `scale(${zoom})`;
    rust.style.transform = `scale(${zoom})`;

    // שקיפות חלודה לפי הזום
    const rustOpacity = (zoom - 1) / (maxZoom - 1);
    rust.style.opacity = rustOpacity;
}, { passive: false });
// -------------------------------
// Mobile pinch-to-zoom support
// -------------------------------
let touchStartDistance = 0;

function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx*dx + dy*dy);
}

window.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
        touchStartDistance = getDistance(e.touches);
    }
}, { passive: true });

window.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
        const currentDistance = getDistance(e.touches);
        const delta = currentDistance - touchStartDistance;

        if (delta > 10) {
            zoomTarget = Math.min(3, zoomTarget + 0.05);
        }
        if (delta < -10) {
            zoomTarget = Math.max(1, zoomTarget - 0.05);
        }
    }
}, { passive: true });

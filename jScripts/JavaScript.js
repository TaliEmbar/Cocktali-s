var selectedAlcohol = "";
var selectedIngredients = [];
var classNotes = "";

// פונקציה לקליטת הנתונים מהטופס
function captureData() {
    var selectedAlcoholElement = document.querySelector('input[name="alcohol"]:checked');
    var selectedIngredientsElements = document.querySelectorAll('input[name="ingredient"]:checked');
    var notes = document.getElementById("notes").value;

    // עדכון משתנים גלובליים עם הערכים שנבחרו
    selectedAlcohol = selectedAlcoholElement.value;
    selectedIngredients = Array.from(selectedIngredientsElements).map(ingredient => ingredient.value);
    classNotes = notes;

    displaySummary(); // הצגת סיכום הבחירה
    updateImages(); // עדכון התמונות בהתאם לבחירה
}

// פונקציה להצגת סיכום הבחירות בחלון קופץ
function displaySummary() {
    var summary = document.getElementById("confirmationMessage");
    summary.innerHTML = `<p>אלכוהול שנבחר:</p><ul><li>${selectedAlcohol}</li></ul>
                        <p>מרכיבים שנבחרו:</p><ul>${selectedIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                        <p>שם מלא והערות נוספות: ${classNotes}</p>`;
    document.getElementById("confirmationModal").style.display = 'block';
}

// פונקציה לסגירת חלון הסיכום
function closeSummary() {
    document.getElementById("confirmationModal").style.display = 'none';
}

// פונקציה לעדכון התמונות בהתאם לבחירות
function updateImages() {
    // הסתרת כל תמונות האלכוהול
    document.querySelectorAll('.alcohol img').forEach(img => img.style.display = 'none');

    // הצגת תמונת האלכוהול שנבחר
    if (selectedAlcohol) {
        document.getElementById(`image_${selectedAlcohol}`).style.display = 'block';
    }

    // החלת מחלקת 'faded' על כל תמונות המרכיבים
    document.querySelectorAll('.ingredients img').forEach(img => img.classList.add('faded'));

    // הסרת מחלקת 'faded' מתמונות המרכיבים שנבחרו
    selectedIngredients.forEach(ingredient => {
        document.getElementById(`image_${ingredient}`).classList.remove('faded');
    });
}

// פונקציה לבדוק אם כל השדות בטופס מולאו
function checkFormValidity() {
    var selectedAlcoholElement = document.querySelector('input[name="alcohol"]:checked');
    var notes = document.getElementById("notes").value;
    var submitButton = document.getElementById("submitButton");

    // אם נבחר אלכוהול והוזנו הערות, הפוך את הכפתור לזמין
    if (selectedAlcoholElement && notes.trim() !== "") {
        submitButton.removeAttribute("disabled");
        submitButton.classList.remove("disabled");
    } else {
        // אחרת, הפוך את הכפתור ללא זמין
        submitButton.setAttribute("disabled", "disabled");
        submitButton.classList.add("disabled");
    }
}

// מאזיני אירועים
document.addEventListener('DOMContentLoaded', () => {
    var form = document.getElementById('cocktailForm');
    var closeButton = document.querySelector('.close-button');

    // מעקב אחרי שינויים בטופס לעדכון התמונות ובדיקת תקינות הטופס
    form.addEventListener('change', () => {
        selectedAlcohol = document.querySelector('input[name="alcohol"]:checked')?.value || "";
        selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(ingredient => ingredient.value);
        updateImages();
        checkFormValidity();
    });

    // מעקב אחרי קלט בתיבת הטקסט לבדוק תקינות הטופס
    form.addEventListener('input', checkFormValidity);

    // מניעת שליחה אוטומטית של הטופס וקלט נתונים
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        captureData();
    });

    // סגירת חלון הסיכום בלחיצה על כפתור סגירה
    closeButton.addEventListener('click', closeSummary);

    // סגירת חלון הסיכום בלחיצה מחוץ לחלון
    window.addEventListener('click', (event) => {
        if (event.target == document.getElementById('confirmationModal')) {
            closeSummary();
        }
    });

    // בדיקת תקינות הטופס בתחילת העמוד
    checkFormValidity();
});

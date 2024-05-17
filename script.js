document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    };

    let storedData = localStorage.getItem('formSubmissions');
    let submissions = storedData ? JSON.parse(storedData) : [];
    submissions.push(formData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    alert('Form başarıyla gönderildi!');

    document.getElementById('contactForm').reset();
    loadSubmissions();
});

document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('adminPassword').value;

    // Parola kontrolü (örneğin, "admin" olarak ayarlandı)
    if (password === 'admin') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadSubmissions();
    } else {
        alert('Yanlış parola. Lütfen tekrar deneyin.');
    }
});

function loadSubmissions() {
    let storedData = localStorage.getItem('formSubmissions');
    let submissions = storedData ? JSON.parse(storedData) : [];
    const tbody = document.querySelector('#submissionsTable tbody');
    tbody.innerHTML = '';
    submissions.forEach(submission => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${submission.name}</td>
            <td>${submission.email}</td>
            <td>${submission.message}</td>
            <td>${submission.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Sayfa yüklendiğinde gönderimleri yükle
document.addEventListener('DOMContentLoaded', loadSubmissions);

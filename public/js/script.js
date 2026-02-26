// document.addEventListener('DOMContentLoaded', function() {
//     // Smooth scroll for anchor links
//     const links = document.querySelectorAll('a[href^="#"]');
    
//     links.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             const targetId = this.getAttribute('href');
//             if (targetId === '#') return;
            
//             const targetElement = document.querySelector(targetId);
            
//             if (targetElement) {
//                 const headerOffset = 100;
//                 const elementPosition = targetElement.getBoundingClientRect().top;
//                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//                 window.scrollTo({
//                     top: offsetPosition,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });

//     // Student data array
//     let students = [
//         { id: '001', firstName: 'Emma', lastName: 'Johnson', email: 'emma.j@email.com', phone: '(555) 123-4567', grade: '11', course: 'English Literature', average: 95, status: 'Active', parentGuardian: 'Mary Johnson' },
//         { id: '002', firstName: 'Michael', lastName: 'Chen', email: 'm.chen@email.com', phone: '(555) 234-5678', grade: '10', course: 'Creative Writing', average: 88, status: 'Active', parentGuardian: 'David Chen' },
//         { id: '003', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.w@email.com', phone: '(555) 345-6789', grade: '12', course: 'Digital Literacy', average: 92, status: 'Active', parentGuardian: 'Jennifer Williams' },
//         { id: '004', firstName: 'James', lastName: 'Rodriguez', email: 'j.rodriguez@email.com', phone: '(555) 456-7890', grade: '11', course: 'English Literature', average: 78, status: 'Active', parentGuardian: 'Carlos Rodriguez' },
//         { id: '005', firstName: 'Olivia', lastName: 'Martinez', email: 'olivia.m@email.com', phone: '(555) 567-8901', grade: '10', course: 'Creative Writing', average: 85, status: 'Inactive', parentGuardian: 'Ana Martinez' },
//         { id: '006', firstName: 'Ethan', lastName: 'Taylor', email: 'ethan.t@email.com', phone: '(555) 678-9012', grade: '12', course: 'Digital Literacy', average: 91, status: 'Active', parentGuardian: 'Robert Taylor' }
//     ];

//     // Form submission
//     const studentForm = document.getElementById('studentForm');
//     if (studentForm) {
//         studentForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Get form values
//             const formData = {
//                 id: String(students.length + 1).padStart(3, '0'),
//                 firstName: document.getElementById('firstName').value,
//                 lastName: document.getElementById('lastName').value,
//                 email: document.getElementById('email').value,
//                 phone: document.getElementById('phone').value || 'N/A',
//                 grade: document.getElementById('grade').value,
//                 course: document.getElementById('course').value,
//                 average: Math.floor(Math.random() * 20) + 75, // Random grade for demo
//                 status: 'Active',
//                 parentGuardian: document.getElementById('parentGuardian').value || 'N/A'
//             };
            
//             // Add to students array
//             students.push(formData);
            
//             // Show success message
//             showSuccessMessage();
            
//             // Update table
//             renderTable(students);
            
//             // Update total students count
//             updateTotalStudents();
            
//             // Reset form
//             this.reset();
            
//             // Scroll to dashboard
//             setTimeout(() => {
//                 document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
//             }, 500);
//         });
//     }

//     // Show success message
//     function showSuccessMessage() {
//         let successMsg = document.querySelector('.success-message');
//         if (!successMsg) {
//             successMsg = document.createElement('div');
//             successMsg.className = 'success-message';
//             successMsg.textContent = '✓ Student added successfully!';
//             const formSection = document.querySelector('.form-section .container');
//             formSection.insertBefore(successMsg, formSection.firstChild);
//         }
        
//         successMsg.classList.add('show');
        
//         setTimeout(() => {
//             successMsg.classList.remove('show');
//         }, 3000);
//     }

//     // Render table
//     function renderTable(data) {
//         const tbody = document.querySelector('#studentTable tbody');
//         tbody.innerHTML = '';
        
//         data.forEach(student => {
//             const row = document.createElement('tr');
            
//             // Determine grade badge class
//             let gradeBadgeClass = 'average';
//             if (student.average >= 90) gradeBadgeClass = 'excellent';
//             else if (student.average >= 80) gradeBadgeClass = 'good';
            
//             row.innerHTML = `
//                 <td>#${student.id}</td>
//                 <td>${student.firstName} ${student.lastName}</td>
//                 <td>${student.email}</td>
//                 <td>${student.grade}th</td>
//                 <td>${student.course}</td>
//                 <td><span class="grade-badge ${gradeBadgeClass}">${student.average}%</span></td>
//                 <td><span class="status-badge ${student.status.toLowerCase()}">${student.status}</span></td>
//                 <td>
//                     <button class="action-btn edit" title="Edit" onclick="editStudent('${student.id}')">✏️</button>
//                     <button class="action-btn delete" title="Delete" onclick="deleteStudent('${student.id}')">🗑️</button>
//                 </td>
//             `;
            
//             tbody.appendChild(row);
//         });
//     }

//     // Update total students count
//     function updateTotalStudents() {
//         const totalStudentsElement = document.getElementById('totalStudents');
//         if (totalStudentsElement) {
//             totalStudentsElement.textContent = students.length;
//         }
//     }

//     // Search functionality
//     const searchInput = document.getElementById('searchInput');
//     if (searchInput) {
//         searchInput.addEventListener('input', function() {
//             filterTable();
//         });
//     }

//     // Course filter
//     const courseFilter = document.getElementById('courseFilter');
//     if (courseFilter) {
//         courseFilter.addEventListener('change', function() {
//             filterTable();
//         });
//     }

//     // Filter table based on search and course filter
//     function filterTable() {
//         const searchTerm = searchInput.value.toLowerCase();
//         const courseValue = courseFilter.value;
        
//         let filteredStudents = students.filter(student => {
//             const matchesSearch = 
//                 student.firstName.toLowerCase().includes(searchTerm) ||
//                 student.lastName.toLowerCase().includes(searchTerm) ||
//                 student.email.toLowerCase().includes(searchTerm) ||
//                 student.course.toLowerCase().includes(searchTerm);
            
//             const matchesCourse = courseValue === '' || student.course === courseValue;
            
//             return matchesSearch && matchesCourse;
//         });
        
//         renderTable(filteredStudents);
//     }

//     // Delete student function
//     window.deleteStudent = function(id) {
//         if (confirm('Are you sure you want to delete this student?')) {
//             students = students.filter(student => student.id !== id);
//             renderTable(students);
//             updateTotalStudents();
            
//             // Show delete message
//             const successMsg = document.createElement('div');
//             successMsg.className = 'success-message show';
//             successMsg.style.background = 'rgba(139, 38, 53, 0.15)';
//             successMsg.style.borderLeftColor = 'var(--burgundy)';
//             successMsg.style.color = 'var(--burgundy)';
//             successMsg.textContent = '✓ Student removed successfully!';
            
//             const dashboardSection = document.querySelector('.dashboard-section .container');
//             dashboardSection.insertBefore(successMsg, dashboardSection.firstChild);
            
//             setTimeout(() => {
//                 successMsg.classList.remove('show');
//                 setTimeout(() => successMsg.remove(), 300);
//             }, 3000);
//         }
//     };

//     // Edit student function
//     window.editStudent = function(id) {
//         const student = students.find(s => s.id === id);
//         if (student) {
//             // Populate form with student data
//             document.getElementById('firstName').value = student.firstName;
//             document.getElementById('lastName').value = student.lastName;
//             document.getElementById('email').value = student.email;
//             document.getElementById('phone').value = student.phone;
//             document.getElementById('grade').value = student.grade;
//             document.getElementById('course').value = student.course;
//             document.getElementById('parentGuardian').value = student.parentGuardian;
            
//             // Scroll to form
//             document.getElementById('student-form').scrollIntoView({ behavior: 'smooth' });
            
//             // Remove the student from array (will be re-added on submit)
//             students = students.filter(s => s.id !== id);
//         }
//     };

//     // Scroll effects
//     window.addEventListener('scroll', () => {
//         const header = document.querySelector('header');
//         if (window.scrollY > 100) {
//             header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
//         } else {
//             header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
//         }
//     });

//     // Initial render
//     renderTable(students);
//     updateTotalStudents();

//     // Animate summary cards on scroll
//     const summaryCards = document.querySelectorAll('.summary-card');
//     const observerOptions = {
//         threshold: 0.2,
//         rootMargin: '0px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry, index) => {
//             if (entry.isIntersecting) {
//                 setTimeout(() => {
//                     entry.target.style.opacity = '1';
//                     entry.target.style.transform = 'translateY(0)';
//                 }, index * 100);
//             }
//         });
//     }, observerOptions);

//     summaryCards.forEach(card => {
//         card.style.opacity = '0';
//         card.style.transform = 'translateY(20px)';
//         card.style.transition = 'all 0.5s ease';
//         observer.observe(card);
//     });

//     // Form input validation feedback
//     const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
//     inputs.forEach(input => {
//         input.addEventListener('blur', function() {
//             if (this.hasAttribute('required') && !this.value.trim()) {
//                 this.style.borderColor = 'var(--burgundy)';
//             } else {
//                 this.style.borderColor = '';
//             }
//         });

//         input.addEventListener('input', function() {
//             this.style.borderColor = '';
//         });
//     });
// });

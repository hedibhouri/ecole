import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Stats
  totalCourses = 0;
  totalTeachers = 0;
  totalStudents = 0;

  // Featured Courses
  featuredCourses: any[] = [];

  // Featured Teachers
  featuredTeachers: any[] = [];

  // Categories
  categories: any[] = [];

  // Testimonials
  testimonials = [
    {
      text: 'Cette plateforme a complètement transformé ma façon d\'apprendre. Les cours sont excellents et les professeurs très engagés.',
      name: 'Alice Durand',
      course: 'Étudiante en Littérature',
      initials: 'AD'
    },
    {
      text: 'Je recommande vivement ! L\'accompagnement personnalisé et la qualité des contenus sont exceptionnels.',
      name: 'Thomas Bernard',
      course: 'Étudiant en Sciences',
      initials: 'TB'
    },
    {
      text: 'Grâce à cette plateforme, j\'ai pu progresser rapidement et atteindre mes objectifs académiques.',
      name: 'Sophie Laurent',
      course: 'Étudiante en Arts',
      initials: 'SL'
    }
  ];

  constructor(private router: Router, private userService: UserService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courseService.getAllCourses().subscribe((res: any) => {
      this.totalCourses = res.courses.length;
      this.featuredCourses = res.courses.slice(0, 4).map((c: any) => ({
        id: c._id,
        courseName: c.courseName,
        description: c.desc,
        teacher: c.teacherId?.firstName + " " + c.teacherId?.lastName || 'Enseignant',
        duration: c.duration || '12 semaines',
        students: c.students?.length || 0,
        category: c.category || 'Général',
        level: c.level || 'Tous niveaux',
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        color: this.getRandomColor()
      }));

      this.generateCategories(res.courses);
    });

    this.userService.getAllUsers().subscribe((res: any) => {
      const teachers = res.users.filter((u: any) => u.role === 'teacher');
      this.totalTeachers = teachers.length;
      const students = res.users.filter((u: any) => u.role === 'student');
      this.totalStudents = students.length;
      console.log("teachers : ", teachers);
      console.log("students : ", students);
      for (let i = 0; i < this.testimonials.length; i++) {
        if (students[i]) {
          this.testimonials[i].name = students[i].firstName + " " + students[i].lastName;
          this.testimonials[i].course = 'Étudiant en ' + (students[i].courses?.[0]?.courseName || 'Général');
          this.testimonials[i].initials = this.getInitials(students[i].firstName + " " + students[i].lastName);
        }
      }

      this.featuredTeachers = teachers.slice(0, 3).map((t: any) => ({
        id: t._id,
        name: t.firstName + " " + t.lastName || 'Enseignant',
        specialty: t.speciality || 'Enseignement',
        courses: t.courses?.length || 0,
        students: t.courses ? t.courses.reduce((acc: number, c: any) => acc + (c.students?.length || 0), 0) : 0,
        color: this.getRandomColor(),
        initials: this.getInitials(t.firstName + " " + t.lastName)
      }));
      console.log(this.featuredTeachers);

    });
  }

  generateCategories(courses: any[]) {
    const catMap = new Map<string, number>();
    courses.forEach(c => {
      const cat = c.category || 'Autre';
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    });

    const icons: any = {
      'Littérature': '📚', 'Sciences': '🔬', 'Mathématiques': '🔢',
      'Arts': '🎨', 'Langues': '🌍', 'Technologie': '💻',
      'Histoire': '📜', 'Philosophie': '🧠'
    };

    this.categories = Array.from(catMap.entries()).map(([name, count], index) => ({
      id: index,
      name,
      icon: icons[name] || '🎓',
      courseCount: count
    }));
  }

  getRandomColor() {
    const colors = ['#8B2635', '#0A2540', '#C9A961', '#7A9B76'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getInitials(name: string) {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';
  }



}

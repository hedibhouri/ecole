import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { CourseAffectationComponent } from './components/course-affectation/course-affectation.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { EditCoureComponent } from './components/edit-coure/edit-coure.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';

export const routes: Routes = [
        { path: "", component: HomeComponent },
        { path: "signup", component: SignupComponent },
        { path: "signupTeacher", component: SignupComponent },
        { path: "signupParent", component: SignupComponent },
        { path: "signupAdmin", component: SignupComponent },
        { path: "login", component: LoginComponent },
        { path: "addCourse", component: AddCourseComponent },
        { path: "myCourses", component: MyCoursesComponent },
        { path: "dashbordAdmin", component: DashbordAdminComponent },
        { path: "courseAffectation", component: CourseAffectationComponent },
        { path: "studentsTable/:id", component: StudentsTableComponent },
        { path: "addNote/:courseId/:id", component: AddNoteComponent },
        { path: "courseInfo/:id", component: CourseInfoComponent },
        { path: "teacherInfo/:id", component: TeacherInfoComponent },
        { path: "teacher", component: TeacherComponent },
        { path: "editCourse/:id", component: EditCoureComponent },
        { path: "editNote/:courseId/:id", component: EditNoteComponent },
        { path: "serchTeacher", component: SearchTeacherComponent },

];

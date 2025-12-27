
export enum CourseFormat {
  TEXT_ONLY = "Solo Texto + Ejercicios",
  VIDEO_TEXT = "Video + Texto",
  HYBRID = "Curso Completo Híbrido"
}

export enum CourseLevel {
  BEGINNER = "Principiante",
  INTERMEDIATE = "Intermedio",
  ADVANCED = "Avanzado"
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface DownloadResource {
  name: string;
  url: string;
}

export interface Lesson {
  title: string;
  duration: string; // Changed from number to string to support format like "15 min"
  video_url: string;
  content_html: string; // Rich text content
  downloads: DownloadResource[];
}

export interface ModuleEvaluation {
  questions: QuizQuestion[]; // Fixed 5 questions
}

export interface Module {
  title: string;
  description: string;
  lessons: Lesson[];
  evaluation: ModuleEvaluation;
}

export interface FinalExam {
  questions: QuizQuestion[]; // Fixed 10 questions
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  final_exam: FinalExam;
}

export interface UserPreferences {
  topic: string;
  level: CourseLevel;
  profile: string;
  objective: string;
  timeAvailable: string;
  format: CourseFormat;
}

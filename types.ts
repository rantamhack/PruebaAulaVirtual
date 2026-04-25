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

export interface VideoReference {
  platform: string;
  search_query: string;
  rationale: string;
  relevance_score: number;
  confidence_score: number;
}

export interface Lesson {
  title: string;
  duration: string;
  video_url: string;
  video_reference?: VideoReference;
  content_html: string;
  downloads: DownloadResource[];
}

export interface ModuleEvaluation {
  questions: QuizQuestion[];
}

export interface Module {
  title: string;
  description: string;
  lessons: Lesson[];
  evaluation: ModuleEvaluation;
}

export interface FinalExam {
  questions: QuizQuestion[];
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
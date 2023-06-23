export interface SubjectModel {
    subjectname: string,
    code: string,
    createdAt: Date,
    classId?: number,
    teacherId?: number
}
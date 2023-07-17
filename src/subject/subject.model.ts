export interface SubjectModel {
    subjectname: string,
    code: string,
    createdAt: Date,
    classId?: number,
    userId?: number
}
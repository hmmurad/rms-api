export interface StudentModel {
    id: number,
    fullname: string,
    email: string,
    dob: string,
    mobile: string,
    gender: string,
    address: string,
    departmentId: number,
    classId: number,
    sessionId?: number
    createdAt: Date
}
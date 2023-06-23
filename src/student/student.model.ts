export interface StudentModel {
    fullname: string,
    roll: string,
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
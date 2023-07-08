export interface StudentModel {
    fullname: string,
    roll: number,
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
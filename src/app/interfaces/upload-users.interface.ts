import { User } from "../models/user.model";

export interface UploadUsers{
    total: number,
    users: User[]
}
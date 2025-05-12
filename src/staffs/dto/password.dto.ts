import { IsStrongPassword } from "class-validator"


export class StaffPasswordDto{
    old_password: string
    @IsStrongPassword()
    new_password: string
}
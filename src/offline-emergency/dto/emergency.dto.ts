import { Type } from "class-transformer"
import { IsNumber, ValidateNested } from "class-validator"
import EmergencyDetailsDto from "./emergencyDetails.dto"

export default class CreateEmergencyDto {
    @IsNumber()
    emergency_level: number

    @ValidateNested({ each: true })
    @Type(() => EmergencyDetailsDto)
    details: EmergencyDetailsDto
}
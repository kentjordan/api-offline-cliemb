import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class OfflineEmergencyService {

    async createOfflineEmergency(req: Request) {

        const access_token = req.headers.authorization.split(" ").at(1);

        try {

            const monitoringState = await axios.get("https://cliemb.online/api/monitoring/state", {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            if (monitoringState.data && monitoringState.data.state === "COMPLETED") {

                try {
                    const detailsRes = await axios.get("https://cliemb.online/api/details", {
                        headers: { Authorization: `Bearer ${access_token}` },
                    });

                    detailsRes.data = {
                        ...detailsRes.data,
                        equipment_needed: detailsRes.data.equipment_needed.join(",")
                    }

                    await axios.post(`${process.env.PROD_API_HOSTNAME}/api/monitoring`, {
                        emergency_level: 1,
                        details: detailsRes.data
                    }, {
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        },
                        timeout: 10000
                    });
                    return;
                } catch (error) {
                    throw new BadRequestException({
                        message: "Something went wrong."
                    });
                }
            }


            throw new UnprocessableEntityException({
                status: "PENDING"
            });


        } catch (error) {

            if (error instanceof UnprocessableEntityException) {
                throw new UnprocessableEntityException({
                    status: "PENDING"
                });

            }
        }

    }

}

export interface EventSummary {
            id: string;
            baseLocation: string;
            beneficiaryName: string;
            venueAddress: string;
            eventName: string;
            eventDescription: string;
            totalNoVolunteers?: number;
            totalVolunteHours: number;
            totalTravelHours: number;
            livesImpacted?: number;
}
export interface EventResolved {
    eventSummary: EventSummary;
    error?: any;
}


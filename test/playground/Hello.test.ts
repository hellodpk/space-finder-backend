import { handler } from '../../services/SpacesTable/Create';

const event = {
    body: {
        location: "Oregon",
        ll:"oo"
    }
}

handler(event as any, {} as any);
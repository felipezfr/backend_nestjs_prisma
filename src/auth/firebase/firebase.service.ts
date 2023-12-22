import { Injectable } from '@nestjs/common';
import * as firebaseAccount from '../FirebaseAccount.json'
import * as admin from 'firebase-admin'

@Injectable()
export class FirebaseService {

    firebaseApp: admin.app.App;

    constructor() {
        this.firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(firebaseAccount as admin.ServiceAccount)
        });
    }

    async verifyToken(token: string): Promise<boolean> {

        try {

            const decoded = await this.firebaseApp.auth().verifyIdToken(token);
            console.log(decoded);

            return true
        } catch (error) {
            return false;
        }

    }
}

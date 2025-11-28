import { Request, Response } from "express"
import Auth from "../../models/Authmodel";
import Profile from "../../models/admin/Profilemodel";

const profileController = {
    updateProfile: async (req: Request, res: Response): Promise<any> => {
        try {
            const email = req.user?.email;

            if (!email)
                res.status(401).json({ success: false, message: 'UnAuthorized' })

            const user = await Auth.findOne({ email });

            if (!user)
                res.status(401).json({ success: false, message: 'Id not found' })

            const {
                name,
                companyName,
                dob,
                address,
                aadharNumber,
                panNumber,
                totalBus,
            } = req.body;

            // ✅ Find and update OR create profile
            const profile = await Profile.findOneAndUpdate(
                { user: user!._id },
                {
                    user: user!._id,
                    companyName,
                    dob,
                    address,
                    aadharNumber,
                    panNumber,
                    totalBus,
                },
                { new: true, upsert: true }
            );

            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                profile,
            });

        } catch (error: any) {
            console.error('Profile error:', error.message as string)
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            })
        }
    },

    // Fetch admin profile details
    fetchAdminProfile: async (req: Request, res: Response): Promise<any> => {
        try {
            const id = req.params.id;

            if (!id)
                res.status(400).json({ success: false, message: 'Must pass the id in params' })

            const profileData = await Profile.findOne({ user: id })
                .populate('user', '-password -createdAt -updatedAt -__v')
                .select('-__v');

            if (!profileData) {
                return res.status(404).json({ success: false, message: 'Profile not found for this user' });
            }

            console.log('profile data', profileData)

            res.status(200).json({
                success: true,
                message: 'Profile data retrived success',
                profileData
            })

        } catch (error: any) {
            console.error('profile retrive error', error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    }

}

export default profileController
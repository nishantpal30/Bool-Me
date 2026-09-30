import WalletTransaction from "../db/models/walletTransaction.js";
import Withdrawal from "../db/models/withdrawl.js";

export const bookingPayouttransation = async ({booking,description})=>{
    if(!booking?.providerPayoutAmount) {
        return null;
    };
    try {
        const walletTransation_Details = await WalletTransaction.create({
            userId:booking.user.id,
            bookingId:booking._id,
            type:"booking_payout",
            amount:booking.providerPayoutAmount,
            currency:booking.currency,
            status:"available",
            description:description || "Booking payout after platform fee cut!!",
        });
        return walletTransation_Details;
    } catch (error) {
        if(error.code ===11000){
            return WalletTransaction.findOne({bookingId:booking._id,type:"booking_payout"});
        }
        throw error;
    }

};

export const getWalletSummary = async (userId) =>{
const [rows , withdrawalRows] = await Promise.all([
    WalletTransaction.aggregate([
        {$match:{userId}},
        {
            $group:{
                _id:`$type`,
                total:{$sum:`$amount`},
            },
        },
    ]),
    Withdrawal.aggregate([
        {$match:{userId}},
        {
            $group:{
                _id:`$status`,
                total:{$sun:`$amount`},
            }
        }
    ])
])
const totals = rows.reduce((acc,row)=>({...acc,[row._id]:row.total}),{});
const withdrawalTotals = withdrawalRows.reduce((acc,row)=>({...acc,[row._id]:row.total}),{});
const earned = totals.booking_payout || 0;
const hold = totals.withdrawal_hold||0;
const reversed = totals.withdrawal_reversal || 0;
const pendingWithdrawals = (withdrawalTotals.pending || 0)+(withdrawalTotals.processing || 0);
const paidWithdrawals = withdrawalTotals.paid || 0;

return {
    earned,
    withdrawOrPending:hold - reversed,
    pendingWithdrawals,
    paidWithdrawals,
    available : Math.max(0,earned - hold+reversed),
}
    
};

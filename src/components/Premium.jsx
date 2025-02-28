import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Premium = () => {

    const handleBuyClick = async (type) => {
        try{
            const order = await axios.post(
                BASE_URL + "/payment/create",
                {
                    membershipType : type,
                },
                { withCredentials: true}
            );

            const { amount,
                    keyId,
                    currency,
                    notes,
                    orderId
            } = order.data;

            const options = {
                key : keyId,
                amount,
                currency,
                name: "Dev tinder",
                description: "Connect to other developers",
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.emailId,
                    contact: "9876543210"
                },
                theme: {
                    color: "#F37254",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div className="m-10">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Silver Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - 100 connection requests per day</li>
                        <li> - Blue tick</li>
                        <li> - 3 months</li>
                    </ul>
                    <button
                        className=" btn btn-secondary"
                        onClick={() => handleBuyClick("silver")}
                    >
                        Buy Silver
                    </button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Gold Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - Infinite connection requests per day</li>
                        <li> - Blue tick</li>
                        <li> - 6 months</li>
                    </ul>
                    <button
                        className=" btn btn-primary"
                        onClick={() => handleBuyClick("silver")}
                    >
                        Buy Gold
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Premium;
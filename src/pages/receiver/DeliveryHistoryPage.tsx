import DeliveryHistoryList from "./DeliveryHistoryList";

const DeliveryHistoryPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Delivery History</h1>
      <DeliveryHistoryList />
    </div>
  );
};

export default DeliveryHistoryPage;

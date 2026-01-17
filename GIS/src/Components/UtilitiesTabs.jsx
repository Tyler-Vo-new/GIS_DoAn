import "../Styles/Components/UtilitiesTabs.css";

const UtilitiesTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="utilities-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`utilities-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default UtilitiesTabs;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./App.css";
import { FaWhatsapp, FaBitcoin, FaEthereum, FaGift } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import image1 from "./assets/c.png";
import image2 from "./assets/1.png";

function App() {
  const [activeTab, setActiveTab] = useState("crypto");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [cryptoPrices, setCryptoPrices] = useState({
    bitcoin: { price: "Loading...", change: 0 },
    ethereum: { price: "Loading...", change: 0 },
    tether: { price: "Loading...", change: 0 },
  });
  const [loading, setLoading] = useState(true);

  const colors = {
    primary: "#F7941D",
    secondary: "#000000",
    background: "#FFFFFF",
    text: "#333333",
  };

  // Fetch crypto prices from CoinGecko API
  const fetchCryptoPrices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd&include_24hr_change=true"
      );

      const { bitcoin, ethereum, tether } = response.data;

      setCryptoPrices({
        bitcoin: {
          price: `$${bitcoin.usd.toLocaleString()}`,
          change: bitcoin.usd_24h_change,
        },
        ethereum: {
          price: `$${ethereum.usd.toLocaleString()}`,
          change: ethereum.usd_24h_change,
        },
        tether: {
          price: `$${tether.usd.toLocaleString()}`,
          change: tether.usd_24h_change,
        },
      });
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      // Fallback to default prices if API fails
      setCryptoPrices({
        bitcoin: { price: "$58,320", change: 0 },
        ethereum: { price: "$3,120", change: 0 },
        tether: { price: "$1.01", change: 0 },
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch prices on component mount and set interval for updates
  useEffect(() => {
    fetchCryptoPrices();

    // Update prices every 60 seconds
    const interval = setInterval(fetchCryptoPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  const assets = {
    crypto: [
      {
        icon: <FaBitcoin className="text-[#F7931A]" />,
        name: "Bitcoin",
        rate: cryptoPrices.bitcoin.price,
        change: cryptoPrices.bitcoin.change,
      },
      {
        icon: <FaEthereum className="text-[#627EEA]" />,
        name: "Ethereum",
        rate: cryptoPrices.ethereum.price,
        change: cryptoPrices.ethereum.change,
      },
      {
        icon: <SiTether className="text-[#26A17B]" />,
        name: "USDT",
        rate: cryptoPrices.tether.price,
        change: cryptoPrices.tether.change,
      },
    ],
    giftcards: [
      {
        icon: <FaGift className="text-[#F7941D]" />,
        name: "Amazon",
        rate: "90%",
      },
      {
        icon: <FaGift className="text-[#333333]" />,
        name: "Steam",
        rate: "88%",
      },
      {
        icon: <FaGift className="text-[#000000]" />,
        name: "Apple",
        rate: "85%",
      },
    ],
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/1234567890?text=Hello%20ChinekeX,%20I%20want%20to%20trade`,
      "_blank"
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <motion.header
        className="py-6 px-4 border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-30 h-10 rounded-md flex items-center justify-center">
              <img src={image1} alt="" />
            </div>
          </motion.div>

          <motion.button
            onClick={openWhatsApp}
            className="flex items-center gap-2 py-2 px-4 rounded-full"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(247, 148, 29, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Trade Now
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: colors.secondary }}
            whileHover={{ scale: 1.02 }}
          >
            <span style={{ color: colors.primary }}>Fast</span> & Secure{" "}
            <span style={{ color: colors.primary }}>Crypto</span> Exchange
          </motion.h1>

          <motion.p
            className="text-xl mb-8"
            style={{ color: colors.text }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Trade your cryptocurrencies and gift cards with confidence
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={openWhatsApp}
              className="py-3 px-8 rounded-full font-bold shadow-lg flex items-center gap-2"
              style={{
                backgroundColor: colors.primary,
                color: colors.background,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(247, 148, 29, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Trading
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex justify-center mb-12"
            whileHover={{ scale: 1.02 }}
          >
            <div className="inline-flex rounded-full overflow-hidden border border-gray-200">
              <button
                onClick={() => setActiveTab("crypto")}
                className={`px-6 py-2 font-medium transition ${
                  activeTab === "crypto" ? "text-white" : "text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    activeTab === "crypto" ? colors.primary : colors.background,
                }}
              >
                Cryptocurrencies
              </button>
              <button
                onClick={() => setActiveTab("giftcards")}
                className={`px-6 py-2 font-medium transition ${
                  activeTab === "giftcards" ? "text-white" : "text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    activeTab === "giftcards"
                      ? colors.primary
                      : colors.background,
                }}
              >
                Gift Cards
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assets[activeTab].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl cursor-pointer border border-gray-200"
                style={{ backgroundColor: colors.background }}
                whileHover={{ y: -10 }}
                animate={{
                  scale: hoveredItem === index ? 1.03 : 1,
                  boxShadow:
                    hoveredItem === index
                      ? `0 10px 25px rgba(0,0,0,0.1)`
                      : "none",
                  borderColor:
                    hoveredItem === index ? colors.primary : "#e5e7eb",
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={openWhatsApp}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    y: hoveredItem === index ? [0, -5, 5, -3, 0] : 0,
                    rotate: hoveredItem === index ? [0, 5, -5, 0] : 0,
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.secondary }}
                >
                  {item.name}
                </h3>
                <p style={{ color: colors.text }}>
                  Rate:{" "}
                  <span className="font-bold" style={{ color: colors.primary }}>
                    {item.rate}
                  </span>
                </p>
                {item.change !== undefined && (
                  <p
                    className={`text-sm mt-1 ${
                      item.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.change >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(item.change).toFixed(2)}% (24h)
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="max-w-2xl mx-auto p-8 rounded-xl border border-gray-200"
          style={{ backgroundColor: colors.background }}
          whileHover={{ scale: 1.01 }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: colors.secondary }}
          >
            Ready to Exchange?
          </h2>
          <p className="mb-6" style={{ color: colors.text }}>
            Get started in minutes with our instant service
          </p>
          <motion.button
            onClick={openWhatsApp}
            className="py-3 px-8 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Chat on WhatsApp
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-8 px-4 text-center border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-4 mb-4">
            <motion.div
              className="w-40 h-8 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
            >
              <img src={image2} alt="" />
            </motion.div>
          </div>
          <p style={{ color: colors.text }}>
            © {new Date().getFullYear()} ChinekeX. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;

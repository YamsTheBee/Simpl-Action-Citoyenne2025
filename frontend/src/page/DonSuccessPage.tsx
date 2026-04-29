const DonSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6">
      <div className="text-center max-w-md">

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          ❤️ Merci pour votre don
        </h1>

        <p className="text-white/70 mb-6">
          Grâce à vous, nous pouvons continuer nos actions.
          Votre soutien est précieux 🙏
        </p>

        <a
          href="/"
          className="inline-block bg-linear-to-r from-purple-600 to-orange-500 px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          Retour à l’accueil
        </a>

      </div>
    </div>
  );
};

export default DonSuccessPage;
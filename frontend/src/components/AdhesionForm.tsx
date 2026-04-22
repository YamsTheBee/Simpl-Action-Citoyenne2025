import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function AdhesionForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    adresse: "",
    profession: "",
    motivation: "",
    experienceAssoc: "",
    structures: "",
    posteAssoc: "",
    roleAssoc: "",
    allergie: "non",
    detailAllergie: "",
    maladie: "non",
    detailMaladie: "",
    resteSansInternet: "",
    autorisationImage: "",
    engagement: false,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/api/adhesion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();

      setStatus("success");

      setFormData({
        nom: "",
        email: "",
        telephone: "",
        dateNaissance: "",
        adresse: "",
        profession: "",
        motivation: "",
        experienceAssoc: "",
        structures: "",
        posteAssoc: "",
        roleAssoc: "",
        allergie: "non",
        detailAllergie: "",
        maladie: "non",
        detailMaladie: "",
        resteSansInternet: "",
        autorisationImage: "",
        engagement: false,
      });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fade-in">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 text-[#28a745] flex items-center justify-center rounded-full mx-auto mb-4 font-bold text-xl">
            SAC
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Rejoindre{" "}
            <span className="text-[#28a745]">Simple Action Citoyenne</span>
          </h2>
          <p className="text-gray-500 italic mt-2">
            "De petits gestes pour de grands changements"
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NOM */}
          <div className="space-y-2">
            <label htmlFor="nom" className="text-sm font-semibold">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                autoComplete="name"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Nom complet"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* DATE + TEL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dateNaissance">Date de naissance</label>
              <input
                id="dateNaissance"
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="telephone">Téléphone</label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  autoComplete="tel"
                  id="telephone"
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  placeholder="Téléphone"
                  className="w-full pl-10 p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                autoComplete="email"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full pl-10 p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* ADRESSE */}
          <div className="space-y-2">
            <label htmlFor="adresse">Adresse</label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                autoComplete="street-address"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
                placeholder="Adresse"
                className="w-full pl-10 p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* PROFESSION */}
          <div className="space-y-2">
            <label htmlFor="profession">Profession</label>
            <div className="relative">
              <Briefcase
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                autoComplete="organization-title"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="Profession"
                className="w-full pl-10 p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* MOTIVATION */}
          <div className="space-y-2">
            <label htmlFor="motivation">Motivation</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg h-28"
            />
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-2">
            <label htmlFor="experienceAssoc">Expérience associative</label>
            <textarea
              id="experienceAssoc"
              name="experienceAssoc"
              value={formData.experienceAssoc}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-24"
            />
          </div>

          {/* STRUCTURES */}
          <div className="space-y-2">
            <label htmlFor="structures">Structures / ONG</label>
            <textarea
              autoComplete="off"
              id="structures"
              name="structures"
              value={formData.structures}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-24"
            />
          </div>

          {/* POSTE */}
          <div className="space-y-2">
            <label htmlFor="posteAssoc">Poste occupé</label>
            <input
              id="posteAssoc"
              name="posteAssoc"
              value={formData.posteAssoc}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <label htmlFor="roleAssoc">Rôle</label>
            <input
              autoComplete="off"
              id="roleAssoc"
              name="roleAssoc"
              value={formData.roleAssoc}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* ALLERGIE */}
          <div className="space-y-2">
            <label>Allergies</label>
            <select
              name="allergie"
              value={formData.allergie}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="non">Non</option>
              <option value="oui">Oui</option>
            </select>
          </div>

          {formData.allergie === "oui" && (
            <input
              name="detailAllergie"
              value={formData.detailAllergie}
              onChange={handleChange}
              placeholder="Détails allergies"
              className="w-full p-3 border rounded-lg"
            />
          )}

          {/* MALADIE */}
          <div className="space-y-2">
            <label>Maladie</label>
            <select
              name="maladie"
              value={formData.maladie}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="non">Non</option>
              <option value="oui">Oui</option>
            </select>
          </div>

          {formData.maladie === "oui" && (
            <input
              name="detailMaladie"
              value={formData.detailMaladie}
              onChange={handleChange}
              placeholder="Détails maladie"
              className="w-full p-3 border rounded-lg"
            />
          )}

          {/* AUTORISATION IMAGE */}
          <div className="space-y-2">
            <label>Autorisation image</label>
            <select
              name="autorisationImage"
              value={formData.autorisationImage}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Choisir</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>

          {/* CHECKBOX */}
          <label className="flex items-start gap-2 bg-green-50 p-4 rounded-lg text-sm">
            <input
              type="checkbox"
              name="engagement"
              checked={formData.engagement}
              onChange={handleChange}
              required
            />
            Je m’engage à respecter les statuts et règlement intérieur.
          </label>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#28a745] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Envoi en cours...
              </>
            ) : (
              "Soumettre ma candidature"
            )}
          </button>

          {/* FEEDBACK */}
          {status === "success" && (
            <div className="flex items-center gap-2 justify-center bg-green-100 text-green-700 p-3 rounded-lg animate-bounce">
              <CheckCircle size={18} />
              Merci pour votre engagement 💚
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 justify-center bg-red-100 text-red-700 p-3 rounded-lg">
              <AlertCircle size={18} />
              Une erreur est survenue.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default AdhesionForm;

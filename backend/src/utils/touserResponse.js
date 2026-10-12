

export const toUserResponse = (user) => {
  if (!user) return null;

  return {
    id: user._id,
    name: user.name,
    email: user.email,

    businessName: user.businessName,
    businessDiscription: user.businessDiscription, // keep your spelling
    timeZone: user.timeZone,

    brandTheme: user.brandTheme,
    brandAccent: user.brandAccent,

    slug: user.slug,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
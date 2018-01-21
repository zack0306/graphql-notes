function feed(parent, args, context, info) {
  const { filter, first, skip } = args;
  const where = filter
    ? { OR: [{ urlContains: filter }, { descriptionContains: filter }] }
    : {};

  return context.db.query.links({ first, skip, where }, info);
}

module.exports = { feed };

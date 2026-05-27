// Generic request-body validator. Pass a zod schema; on failure responds 400
// with the field-level issues, otherwise replaces req.body with the parsed
// (and coerced) data and calls next().
export const validateBody = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({
			error: "Validation failed",
			issues: result.error.issues.map((i) => ({
				field: i.path.join("."),
				message: i.message,
			})),
		});
	}
	req.body = result.data;
	next();
};

from util.casetoHumanReadable import camelcase_to_human


def int_to_str(num):
    num = round(num, 2)
    num = f"{float(num):g}"
    return str(num)

# This conversion has some incorrect values
def convert_SI_to_human_units(data):
    conversion_factors = {
        "calcium": (100000, "mg"),
        "calories": (0.1, "cal"),
        "cholesterol": (1, "mg"),
        "dietaryFiber": (1000, "g"),
        "iron": (100000, "mg"),
        "potassium": (100000, "mg"),
        "protein": (100, "g"),
        "sodium": (100000, "mg"),
        "sugars": (100, "g"),
        "totalCarbs": (100, "g"),
        "monounsaturatedFat": (1, "g"),
        "polyunsaturatedFat": (1, "g"),
        "saturatedFat": (1, "g"),
        "transFat": (1, "g"),
        "totalFat": (100, "g"),
        "vitaminA": (10000000, "μg"),
        "vitaminC": (10000000, "μg"),
    }

    human_readable_data = {}
    for key, value in data.items():
        if key in conversion_factors:
            conversion_factor, unit = conversion_factors[key]
            converted_value = value * conversion_factor
            human_readable_data[camelcase_to_human(key)] = (
                int_to_str(converted_value) + " " + unit
            )
        else:
            human_readable_data[camelcase_to_human(key)] = int_to_str(value)

    return human_readable_data

import re


def camelcase_to_human(variable_name):
    # Use regular expression to split the variable name
    words = re.findall(r"(?:^|[A-Z])[a-z]*", variable_name)
    # Join the words with spaces and convert to lowercase
    human_readable = " ".join(words).lower()
    return human_readable


# Example usage
camelcase_variable = "vitaminA"
human_readable_string = camelcase_to_human(camelcase_variable)
print(human_readable_string)

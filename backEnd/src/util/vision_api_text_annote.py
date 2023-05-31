from google.cloud import vision
import cv2
from skimage import io


# Draw bounding boxes around detected text
def annote_text(client, img_url):
    try:
        # Load the image using OpenCV
        image = io.imread(img_url)

        # Convert the image to RGB color (if needed)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Prepare the image for Vision API
        success, encoded_image = cv2.imencode(".jpg", image_rgb)
        content = encoded_image.tobytes()
        image = vision.Image(content=content)

        # Perform text detection using Vision API
        response = client.document_text_detection(image=image)
        texts = response.text_annotations[
            1:
        ]  # Exclude the first element, which contains the whole text

        # Draw bounding boxes around detected text
        for text in texts:
            vertices = [(vertex.x, vertex.y) for vertex in text.bounding_poly.vertices]
            cv2.rectangle(
                image_rgb, vertices[0], vertices[2], (0, 255, 0), 2
            )  # Draw a green rectangle

        # Save the resulting image with text boxes
        output_path = "pres.jpg"
        cv2.imwrite(output_path, image_rgb)
        print(f"Image saved at {output_path}")
        return response
    except Exception as e:
        print(e)

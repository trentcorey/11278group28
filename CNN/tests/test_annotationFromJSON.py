import unittest
from cnn_proj_utils import util_process_image

class TestFunction1(unittest.TestCase):
    def testFunction1(self):
        self.assertEqual(util_process_image)                  # All vowels.
        self.assertEqual(Function1.remove_vowels("aeoiuf"), "f")                # All vowels, one non-vowel.
        self.assertEqual(Function1.remove_vowels("GeeksforGeeks"), "GksfrGks")  # Mixed capital letters.
        self.assertEqual(Function1.remove_vowels("1a2e3i4o5u"), "12345")        # Embedded numbers.
        self.assertEqual(Function1.remove_vowels("ApPles"), "pPls")             # Mixed capital letters.
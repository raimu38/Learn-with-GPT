# from django.test import TestCase
# from django.urls import resolve
# from snippets.views import top, snippet_new, snippet_edit, snippet_detail

# class CreateSnippetTest(TestCase):
#     def test_should_resolve_snippet_new(self):
#         found = resolve("/snippets/new/")
#         self.assertEqual(snippet_new, found.func)


# class SnippetDetailTest(TestCase):
#     def test_should_resolve_snippet_detail(self):
#         found = resolve("/snippets/1")
#         self.assertEqual(snippet_detail, found.func)

# class SnippetEditTest(TestCase):
#     def test_should_resolve_snippet_edit(self):
#         found = resolve("/snippets/1/edit")
#         self.assertEqual(snippet_edit, found.func)


from django.test import TestCase, Client, RequestFactory
from django.contrib.auth import get_user_model
from snippets.models import Snippet
from snippets.views import top

UserModel = get_user_model()

class TopPageTest(TestCase):
    def test_top_page_returns_200_and_expected_title(self):
        response = self.client.get("/")
        self.assertContains(response, "Djangoスニペット", status_code=200)

    def test_top_page_uses_expected_template(self):
        response = self.client.get("/")
        self.assertTemplateUsed(response, "snippets/top.html")


class TopPageRenderSnippetsTest(TestCase):
    def setUp(self):
        self.user = UserModel.objects.create(username="test1",email="test1@example.com",password="test1")
        self.snippet = Snippet.objects.create(title="title1",code="print('hello)",description="description1",created_by=self.user)

    def test_should_return_snippet_title(self):
        request = RequestFactory().get("/")
        request.user = self.user
        response = top(request)
        self.assertContains(response, self.snippet.title)

    def test_should_return_usernae(self):
        request = RequestFactory().get("/")
        request.user = self.user
        response = top(request)
        self.assertContains(response, self.user.username)

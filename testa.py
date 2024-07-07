from openai import OpenAI
from composio_openai import ComposioToolSet, Action

openai_client = OpenAI(api_key="sk-proj-DlCGXoTxBcP1l8TGafJVT3BlbkFJziFqGcqOZI8QPuEh28GP")
composio_tools = ComposioToolSet()

actions = composio_tools.get_actions(actions=[Action.GITHUB_STAR_REPO])

my_task = "Tell me what the following GitHub repo is about: https://github.com/Profusion-AI/ST-Docker"

assistant_instruction = "You are a super intelligent personal assistant"

assistant = openai_client.beta.assistants.create(
    name="Personal Assistant",
    instructions=assistant_instruction,
    model="gpt-4o",
    tools=actions,  # type: ignore
)

thread = openai_client.beta.threads.create()
message = openai_client.beta.threads.messages.create(thread_id=thread.id,role="user",content=my_task)

run = openai_client.beta.threads.runs.create(thread_id=thread.id,assistant_id=assistant.id)

response_after_tool_calls = composio_tools.wait_and_handle_assistant_tool_calls(
    client=openai_client,
    run=run,
    thread=thread,
)

url = f"https://platform.openai.com/playground/assistants?assistant=asst_YR19WVAUmmxU2HcEgbqFDb9J&mode=assistant"
print(response_after_tool_calls)

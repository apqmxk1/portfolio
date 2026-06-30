const contactBtn = document.getElementById("contactBtn");

if (contactBtn) {
  contactBtn.addEventListener("click", function () {
    const form = document.getElementById("contactForm");

    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById("visitorName").focus();
    } else {
      alert("Email: your.email@example.com");
    }
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("visitorName").value;
    const email = document.getElementById("visitorEmail").value;
    const message = document.getElementById("visitorMessage").value;
    const responseDiv = document.getElementById("responseMessage");

    setResponseMessage(
      responseDiv,
      "is-loading",
      "AI 에이전트가 질문을 분석 중입니다... 잠시만 기다려주세요."
    );

    // Make.com에서 발급받은 Custom Webhook URL로 교체하세요.
    const makeWebhookUrl = "https://hook.us1.make.com/your_unique_webhook_id";

    try {
      const response = await fetch(makeWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          visitor_name: name,
          visitor_email: email,
          visitor_message: message
        })
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      setResponseMessage(
        responseDiv,
        "is-success",
        "질문이 성공적으로 접수되었습니다! 입력하신 메일로 AI의 답변이 곧 발송됩니다."
      );
      contactForm.reset();
    } catch (error) {
      setResponseMessage(
        responseDiv,
        "is-error",
        "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  });
}

function setResponseMessage(element, className, text) {
  element.className = "response-message " + className;
  element.innerText = text;
}

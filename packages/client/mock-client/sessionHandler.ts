import { Session } from "@hrgui/neko-terebi-api-eda-client/types";

export const premiumSession: Session = {
  accountId: "1",
  profileId: "1",
  username: "premium",
  activeProfile: { profileId: "1" },
  profiles: [{ profileId: "1" }],
  benefits: [{ benefit: "premium" }],
  preferredSubtitleLanguageOption: "default",
  preferredAudioLanguageOption: "en-US",
};

export const freeSession: Session = {
  accountId: "1",
  profileId: "1",
  username: "free",
  activeProfile: { profileId: "1" },
  profiles: [{ profileId: "1" }],
  benefits: [],
  preferredSubtitleLanguageOption: "default",
  preferredAudioLanguageOption: "en-US",
};

export function setupSessionHandler(eventBus: EventTarget) {
  eventBus.addEventListener("session/request", (e: Event) => {
    const props = (e as CustomEvent).detail;

    eventBus.dispatchEvent(
      new CustomEvent("session/response", {
        detail: { id: props.id, data: premiumSession },
      })
    );
  });
}

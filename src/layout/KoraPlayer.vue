<template>
      <main> 

<div class="gap-1 px-6 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col w-80">
        <h2 class="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Learn Traditional African Kora Music</h2>
        <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <select
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-14 bg-[image:--select-button-svg] placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
            >
              <option value="one">Select a .midi file</option>
              <option value="two">two</option>
              <option value="three">three</option>
            </select>
          </label>
        </div>
        <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Upload a .midi file"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
              value=""
            />
          </label>
        </div>
        <div class="flex w-full grow bg-[#10231c] @container p-4">
          <div class="w-full gap-1 overflow-hidden bg-[#10231c] @[480px]:gap-2 aspect-[3/2] rounded-lg flex">
             <div
              class="w-full  min-w-[320px] bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC0_51E_bt-8oYaGuGezhUvL13qQINvKHxASAjb4Uyc5kU1draksHm4d3ziXGIIuXPeqGXDbfAL8rotOqEVyE81SjENKyGmS3AEN2GXfxX84Awf151T5bxJz0L3l9b1BxLjFMrzwkhvCSu-XoSP7XU8NfP-EgH-3yLFsS4rONGq4X6ixQUg0_ZpUHxRCAZjM-pfYX7JAx1ExMPXdidU7k_OfhIJYGCS76Fbw0G-oPyGA0qaR6sO7VYjDpjKAg43kGYDAK20FyvvN-A");'
            >      
          </div>
          </div>
        </div>
      </div>
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Sheet Music</h2>
        <KoraMidi />
        <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          Horizontally scrollable sheet music score rendered with VexFlow and note name annotations. Notes are highlighted in sync with the interactive kora bridge. The sheet
          music display area is enhanced to clearly showcase the rendered sheet music, including measures, staves, and musical notes with annotations. Modern West African
          colors such as vibrant greens, blues, and browns are incorporated throughout the design to create a more culturally rich and visually appealing interface.
        </p>
        <div class="p-4 @container">
      
          <div class="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
            <div
              class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB66SG5FnFHkzx1HCN_tCwK333Sd6k_21g6P2WJ8_9EKEWmwGh_O9fGBAvXK5nojtDmPIZouvvOUHtfYNwPgaWCDyMb_cM6R1hPCXHfocamxuE3Gh44sQlQsf3qUchZMD9AHncfDQ4ZPO6srTZCoXdMatjmmySzDETGmtK0ZNMejT2GqH_XOqBG-cTLokJgoSqYFdIWj26LrIzFnHP3VipRkutXOZ0dQjUyUN0cmW0P83OpTdCiv7YhRlt9mt3fBbjfAjiAAQcvm-Y");'
            ></div>
            <div class="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
              <p class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Sheet Music Display</p>
              <div class="flex items-end gap-3 justify-between">
                <p class="text-[#8ecdb7] text-base font-normal leading-normal">Interactive sheet music with playback controls</p>
                <button
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#019863] text-white text-sm font-medium leading-normal"
                >
                  <span class="truncate">Play/Pause</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="@container">
          <div class="relative flex w-full flex-col items-start justify-between gap-3 p-4 @[480px]:flex-row">
            <p class="text-white text-base font-medium leading-normal w-full shrink-[3]">Playback Speed</p>
            <div class="flex h-[38px] w-full pt-1.5">
              <div class="flex h-1 w-full rounded-sm bg-[#2f6a55] pl-[60%] pr-[15%]">
                <div class="relative">
                  <div class="absolute -left-3 -top-1.5 flex flex-col items-center gap-1">
                    <div class="size-4 rounded-full bg-[#019863]"></div>
                    <p class="text-white text-sm font-normal leading-normal">0.1</p>
                  </div>
                </div>
                <div class="h-1 flex-1 rounded-sm bg-[#019863]"></div>
                <div class="relative">
                  <div class="absolute -left-3 -top-1.5 flex flex-col items-center gap-1">
                    <div class="size-4 rounded-full bg-[#019863]"></div>
                    <p class="text-white text-sm font-normal leading-normal">2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-[#8ecdb7] text-sm font-normal leading-normal pb-3 pt-1 px-4">Current Time: 0:00</p>
      </div>
    </div>



</main>
</template>

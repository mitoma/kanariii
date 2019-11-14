/// <reference path="../../node_modules/@kintone/dts-gen/kintone.d.ts" />

export type UserInfo = {
  userOrganizations: Organization[];
  organizations: Organization[];
  userGroups: Group[];
  groups: Group[];
};

export type Organization = {
  id: string;
  name: string;
  code: string;
  parentCode: string;
  localName: string;
  localNameLocale: string;
  description: string;
};

type Organizations = {
  organizations: Organization[];
};

type Title = {
  id: string;
  code: string;
  name: string;
  description: string;
};

type OrganizationTitle = {
  organization: Organization;
  title: Title;
};

type OrganizationTitles = {
  organizationTitles: OrganizationTitle[];
};

export type Group = {
  id: string;
  code: string;
  name: string;
  description: string;
};

type Groups = {
  groups: Group[];
};

export class SlashClient {
  async loadUserOrganizations() {
    const resp: OrganizationTitles = await kintone.api(
      this.url('/v1/user/organizations'),
      'GET',
      { code: kintone.getLoginUser().code },
    );
    return resp.organizationTitles.map(orgAndTitle => {
      return orgAndTitle.organization;
    });
  }

  async loadOrganizations() {
    const resp: Organizations = await kintone.api(
      this.url('/v1/organizations'),
      'GET',
      {},
    );
    return resp.organizations;
  }

  async loadUserGroups() {
    const resp: Groups = await kintone.api(this.url('/v1/user/groups'), 'GET', {
      code: kintone.getLoginUser().code,
    });
    return resp.groups;
  }

  async loadGroups() {
    const resp: Groups = await kintone.api(this.url('/v1/groups'), 'GET', {
      code: kintone.getLoginUser().code,
    });
    return resp.groups;
  }

  private url(path: string): string {
    return kintone.api.url(path, true);
  }
}
